import React, {useState, useEffect} from "react"
import {Box, Container, Center, Divider, Grid, GridItem, NumberInput, NumberDecrementStepper, NumberIncrementStepper, NumberInputField, NumberInputStepper, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Stack, Switch, Text} from "@chakra-ui/react";
import { set } from "react-hook-form";

const PaymentCalculator = () => {

  // true = personal loan, false = mortgage
  const [calcType, setCalcType] = useState(true)

  //could have used an object for all this data, but trickier to setState inline with the data needed, so used 5 separate variables 
  const [loanAmount, setLoanAmount] = useState(50)
  const [loanLengthMonths, setLoanLengthMonths] = useState(1)
  const [loanLengthYears, setLoanLengthYears] = useState(1)
  const [interestRate, setInterestRate] = useState(2.5)
  const [monthlyPayment, setMonthlyPayment] = useState(50)

  // not the most elegant solution, but wanted to break it out step-by-step for read ability. 
  let calculatePayments = () => {
    let pv = loanAmount;
    let i = (interestRate / 100) / 12;
    // need to convert loan lengths for both months and years 
    let n;
    calcType ? n = loanLengthMonths : n = loanLengthYears * 12;

    // numerator and denominator split out for readability and to ensure accuracy
    let numer = pv* (i * (1 + i)**n);
    let denom = (1 + i)**n - 1;
    let a = (numer / denom);
    let num = parseFloat(parseFloat(a).toFixed(2)).toLocaleString('en-EN', { useGrouping: true });
    setMonthlyPayment(num);
  }


  // added a use effect that is triggered by any change in the browser to recalculate for real-time payment needs
  useEffect(() => {
    calculatePayments()
  }, [loanAmount, loanLengthMonths, loanLengthYears, interestRate]);

  // defining the key variables for the execution of the calculator 
  let montlyLoansConstraints = {minTime: 1, maxTime: 12, minLoan: 50, maxLoan: 1000, loanSteps:50, minInterest: 20, maxInterest: 200, interestSteps: 2.5}
  let yearlyLoansConstraints = {minTime : 1, maxTime: 30, minLoan: 5000, maxLoan: 1500000, loanSteps: 2500, minInterest: 2.5, maxInterest: 20, interestSteps: 0.25}

  // resets the variables everytime 'mortgage' or 'payday' is clicked
  useEffect(() => {
    if (calcType){
      setLoanAmount(montlyLoansConstraints.minLoan)
      setLoanLengthMonths(montlyLoansConstraints.minTime)
      setInterestRate(montlyLoansConstraints.minInterest)
    }
    if (!calcType){
      setLoanAmount(yearlyLoansConstraints.minLoan)
      setLoanLengthYears(yearlyLoansConstraints.minTime)
      setInterestRate(yearlyLoansConstraints.minInterest)
    }
  }, [calcType]);

  
let colorStyle = (calcType ? "#56c2b0" : "#e47a36");

// used Chakra UI instead of bootstrap because it 
  return (
    <>
    <Container maxW="auto" >
    <Center>
      <Stack pt={15, 25, 40} direction="row">
        <Text p={2} textAlign='center' fontSize={['xl', '2xl']}  textColor="#56c2b0" > Personal Loan </Text>
        <Switch p={3} colorScheme="#56c2b0" size="lg" onChange={() => setCalcType(!calcType)}/>
        <Text p={2} textAlign='center' fontSize={['xl', '2xl']} textColor="#e47a36"> Home Loan </Text>
      </Stack>
    </Center>
    </Container>
    <Container pt={5} colSpan={1} maxW="auto" >
      <Box
        w={{base: 'auto', md: 1100}}
        h={['auto', 'auto']}
        borderRadius='lg'
        mt={[1]}
        border="1px"
        borderColor={colorStyle}
      >
        <Grid templateColumns={{base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)"}} templateRows={{base: "repeat(2, 1fr)", lg: "repeat(1, 1fr)"}}> 

          <GridItem colSpan={{base: "0", lg: "1"}} rowSpan={{base: "0", lg: "1"}} >
            <Text fontSize= {['3xl', '7xl']} textAlign='center' textColor={colorStyle}>${loanAmount.toLocaleString('en-US')}</Text>
            <Text fontSize= {['lx', '2xl']}  textAlign='center'>Loan Amount</Text>
          </GridItem>     
          <GridItem colSpan={["0", "1"]} >
            <Text fontSize= {['3xl', '7xl']} textAlign='center' textColor={colorStyle}>${monthlyPayment}</Text>
            <Text fontSize= {['lx', '2xl']} textAlign='center'>Monthly Payments</Text>
          </GridItem>      
        </Grid>
        <Divider pt={2}/>
        <Grid p={6} templateColumns={{base: "repeat(4, 1fr)", lg:"repeat(9, 1fr)"}} templateRows={{base: "repeat(6, 1fr)", lg: "repeat(3, 1fr)"}} gap={6}>
        <GridItem pt={2} colSpan={["1", "2"]} rowSpan="1">
            <Text textAlign='right' fontSize={['md', 'xl']}>Loan Amount</Text>
        </GridItem>
        <GridItem pt={2} colSpan={["3", "2"]}rowSpan="1">
            <NumberInput 
            min={calcType ? montlyLoansConstraints.minLoan : yearlyLoansConstraints.minLoan} 
            max={calcType ? montlyLoansConstraints.maxLoan : yearlyLoansConstraints.maxLoan} 
            step={calcType ? montlyLoansConstraints.loanSteps : yearlyLoansConstraints.loanSteps} 
            value={`$${loanAmount.toLocaleString('en-US')}`} 
            onChange={val => setLoanAmount(Number(val))}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
        </GridItem>
          <GridItem ml={5} mr={12} pr={1} colSpan={{base: "4", lg: "5"}} rowSpan="1">
            <Slider name='loanAmount' focusThumbOnChange={false} 
            value={loanAmount} 
            min={calcType ? montlyLoansConstraints.minLoan : yearlyLoansConstraints.minLoan} 
            max={calcType ? montlyLoansConstraints.maxLoan : yearlyLoansConstraints.maxLoan} 
            step={calcType ? montlyLoansConstraints.loanSteps : yearlyLoansConstraints.loanSteps} 
            onChange={(val) => setLoanAmount(val) }>
              <SliderTrack bg="grey" >
                <SliderFilledTrack bg={colorStyle} />
              </SliderTrack>
              <SliderThumb boxSize={'auto'} p={1} pb={2} pt={2} color='black'> ${loanAmount.toLocaleString('en-US')}</SliderThumb>
            </Slider>
          </GridItem>



          {calcType ? 
          <>
          <GridItem pt={2} colSpan={["1", "2"]} rowSpan="1">
            <Text textAlign='right' fontSize={['md', 'xl']}>Repayment Months</Text>
          </GridItem>
          <GridItem pt={2} colSpan={["3", "2"]} rowSpan="1">
          <NumberInput min={1} max={12} value={loanLengthMonths} onChange={val => setLoanLengthMonths(Number(val))}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </GridItem>

          <GridItem ml={5} mr={12} pr={1} colSpan={{base: "4", lg: "5"}} rowSpan="1">
            <Slider name='loanAmount' focusThumbOnChange={false} value={loanLengthMonths} min={1} max={12} step={1} onChange={(val) => setLoanLengthMonths(val) }>
              <SliderTrack bg="grey">
                <Box position="relative" right={10} />
                <SliderFilledTrack bg={colorStyle} />
              </SliderTrack>
              <SliderThumb width={{ base: 0, lg:"aut" }} boxSize={'auto'} p={3} pb={2} pt={2} color='black'> {loanLengthMonths.toLocaleString('en-US')}</SliderThumb>
            </Slider>
          </GridItem>

          </>
          :
          <>
          <GridItem pt={2} colSpan={["1", "2"]} rowSpan="1">
            <Text textAlign='right' fontSize={['md', 'xl']}>Repayment Years</Text>
          </GridItem>
          <GridItem pt={2} colSpan={["3", "2"]} rowSpan="1">
          <NumberInput min={1} max={30} value={loanLengthYears} onChange={val => setLoanLengthYears(Number(val))}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </GridItem>
          <GridItem ml={5} mr={12} pr={1} colSpan={{base: "4", lg: "5"}} rowSpan="1">
            <Slider name='loanAmount' value={loanLengthYears} min={1} max={30} step={1} onChange={(val) => setLoanLengthYears(val) }>
                <SliderTrack bg="grey">
                  <SliderFilledTrack bg={colorStyle} />
                </SliderTrack>
              <SliderThumb boxSize={'max'} p={3} pb={2} pt={2} color='black'> {loanLengthYears.toLocaleString('en-US')}</SliderThumb>
            </Slider>
          </GridItem>
          </>
          }
          <GridItem pt={2} colSpan={["1", "2"]} rowSpan="1">
            <Text textAlign='right' fontSize={['md', 'xl']}>Interest Rate (ARP)</Text>
          </GridItem>
          <GridItem pt={2} colSpan={["3", "2"]} rowSpan="1">
          <NumberInput 
          min= {calcType ? montlyLoansConstraints.minInterest : yearlyLoansConstraints.minInterest} 
          max= {calcType ? montlyLoansConstraints.maxInterest : yearlyLoansConstraints.maxInterest} 
          step= {calcType ? montlyLoansConstraints.interestSteps : yearlyLoansConstraints.interestSteps} 
          value = {`${interestRate}%`}
          onChange={val => setInterestRate(val)}
          >
            <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </GridItem>
          <GridItem ml={5} mr={12} pr={1} colSpan={{base: "4", lg: "5"}} rowSpan="1">
          <Slider name='interestRate' id='interestRateSlider' 
          value={interestRate} 
          min= {calcType ? montlyLoansConstraints.minInterest  : yearlyLoansConstraints.minInterest } 
          max= {calcType ? montlyLoansConstraints.maxInterest : yearlyLoansConstraints.maxInterest} 
          step= {calcType ? montlyLoansConstraints.interestSteps : yearlyLoansConstraints.interestSteps} 
          onChange={(val) => setInterestRate(val) }>
              <SliderTrack bg="grey">
                <SliderFilledTrack bg={colorStyle} />
              </SliderTrack>
              <SliderThumb boxSize={'max'} p={1} pb={2} pt={2} color='black'> {interestRate}%</SliderThumb>
            </Slider>
          </GridItem>


        </Grid>
    </Box>
    </Container>
    </>
  );
};
export default PaymentCalculator;