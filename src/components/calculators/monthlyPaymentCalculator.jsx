import React, {useState, useEffect} from "react"
import {Box, Container, Center, Divider, Grid, GridItem, NumberInput, NumberDecrementStepper, NumberIncrementStepper, NumberInputField, NumberInputStepper, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Stack, Switch, Text} from "@chakra-ui/react";
import { set } from "react-hook-form";

const PaymentCalculator = () => {

  // true = personal loan, false = mortgage
  const [calcType, setCalcType] = useState(true)

  const [loanAmount, setLoanAmount] = useState(50)
  const [loanLengthMonths, setLoanLengthMonths] = useState(1)
  const [loanLengthYears, setLoanLengthYears] = useState(1)
  const [interestRate, setInterestRate] = useState(2.5)
  const [monthlyPayment, setMonthlyPayment] = useState(50)

  let calculatePayments = () => {
    let pv = loanAmount;
    let i = (interestRate / 100) / 12;
    let n;
    calcType ? n = loanLengthMonths : n = loanLengthYears * 12;

    // P = L[c(1 + c)n]/[(1 + c)n - 1]
    // L dollars over a term of 
    // n months at a 
    // monthly interest rate of c (APR/12 ).

    let numer = pv* (i * (1 + i)**n);
    let denom = (1 + i)**n - 1;
    let a = (numer / denom);

    let num = parseFloat(parseFloat(a).toFixed(2)).toLocaleString('en-EN', { useGrouping: true });
    setMonthlyPayment(num);
  }


  useEffect(() => {
    calculatePayments()
  }, [loanAmount, loanLengthMonths, loanLengthYears, interestRate]);

  let montlyLoansConstraints = {minTime: 1, maxTime: 12, minLoan: 50, maxLoan: 1000, loanSteps:50, minInterest: 20, maxInterest: 200, interestSteps: 2.5}
  let yearlyLoansConstraints = {minTime : 1, maxTime: 30, minLoan: 5000, maxLoan: 1500000, loanSteps: 2500, minInterest: 2.5, maxInterest: 20, interestSteps: 0.25}

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


  return (
    <>

    <Center>
      <Stack pt={15, 25, 40} direction="row">
        <Text p={2} textAlign='center' fontSize='2xl'  textColor="#56c2b0" > Personal Loan </Text>
        <Switch p={3} colorScheme="#56c2b0" size="lg" onChange={() => setCalcType(!calcType)}/>
        <Text p={2} textAlign='center' fontSize='2xl' textColor="#e47a36"> Home Loan </Text>
      </Stack>
    </Center>
    <Container pt={5} colSpan={1} maxW="lg" centerContent>
      <Box
        w={[300, 325, 1250]}
        h={['auto', 'auto']}
        borderRadius='lg'
        mt={[1]}
        pl={4}
        border="1px"
        borderColor={colorStyle}
      >
        <Grid templateColumns={{base: "repeat(2, 1fr)", md: 'repeat(2, 1fr'}}> 

          <GridItem colSpan={["0", "1"]} >
            <Text fontSize= {['6xl', '7xl']} textAlign='center' textColor={colorStyle}>${loanAmount.toLocaleString('en-US')}</Text>
            <Text fontSize= {['lx', '2xl']}  textAlign='center'>Loan Amount</Text>
          </GridItem>     
          <GridItem colSpan={["0", "1"]} >
            <Text fontSize= {['5xl', '7xl']} textAlign='center' textColor={colorStyle}>${monthlyPayment}</Text>
            <Text fontSize= {['lx', '2xl']} textAlign='center'>Monthly Payments</Text>
          </GridItem>      
        </Grid>
        <Divider pt={2}/>
        <Grid p={6} templateColumns={["repeat(9, 1fr)"]} templateRows={["repeat(3, 1fr)"]} gap={10}>
        <GridItem pt={2} colSpan="2" rowSpan="1">
            <Text textAlign='right' fontSize='xl'>Loan Amount</Text>
        </GridItem>
        <GridItem pt={2} colSpan="2" rowSpan="1">
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
          <GridItem ml={5} mr={12} pr={1} colSpan={["0", "5"]} rowSpan="1">
            <Slider name='loanAmount' focusThumbOnChange={false} 
            value={loanAmount} 
            min={calcType ? montlyLoansConstraints.minLoan : yearlyLoansConstraints.minLoan} 
            max={calcType ? montlyLoansConstraints.maxLoan : yearlyLoansConstraints.maxLoan} 
            step={calcType ? montlyLoansConstraints.loanSteps : yearlyLoansConstraints.loanSteps} 
            onChange={(val) => setLoanAmount(val) }>
              <SliderTrack bg="grey" >
                <Box position="relative" right={20} />
                <SliderFilledTrack bg={colorStyle} />
              </SliderTrack>
              <SliderThumb boxSize={'max'} p={3} color='black'> ${loanAmount.toLocaleString('en-US')}</SliderThumb>
            </Slider>
          </GridItem>



          {calcType ? 
          <>
          <GridItem colSpan="2" pt={2} rowSpan="1">
            <Text textAlign='right' fontSize='xl'>Repayment Months</Text>
          </GridItem>
          <GridItem colSpan="2" pt={2} rowSpan="1">
          <NumberInput min={1} max={12} value={loanLengthMonths} onChange={val => setLoanLengthMonths(Number(val))}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </GridItem>

          <GridItem ml={5} mr={12} pr={1} colSpan="5" rowSpan="1">
            <Slider name='loanAmount' focusThumbOnChange={false} value={loanLengthMonths} min={1} max={12} step={1} onChange={(val) => setLoanLengthMonths(val) }>
              <SliderTrack bg="grey">
                <Box position="relative" right={10} />
                <SliderFilledTrack bg={colorStyle} />
              </SliderTrack>
              <SliderThumb boxSize={'max'} p={3}  color='black'> {loanLengthMonths.toLocaleString('en-US')}</SliderThumb>
            </Slider>
          </GridItem>

          </>
          :
          <>
          <GridItem colSpan="2" pt={1} rowSpan="1">
            <Text textAlign='right' fontSize='xl'>Repayment Years</Text>
          </GridItem>
          <GridItem colSpan="2" pt={2} rowSpan="1">
          <NumberInput min={1} max={30} value={loanLengthYears} onChange={val => setLoanLengthYears(Number(val))}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </GridItem>
          <GridItem ml={5} mr={12} pr={1} colSpan="5" rowSpan="1">
            <Slider name='loanAmount' value={loanLengthYears} min={1} max={30} step={1} onChange={(val) => setLoanLengthYears(val) }>
                <SliderTrack bg="grey">
                  <Box position="relative" right={10} />
                  <SliderFilledTrack bg={colorStyle} />
                </SliderTrack>
              <SliderThumb boxSize={'max'} p={3} color='black'> {loanLengthYears.toLocaleString('en-US')}</SliderThumb>
            </Slider>
          </GridItem>
          </>
          }
          <GridItem colSpan="2" p={2} rowSpan="1">
            <Text textAlign='right' fontSize='xl'>Interest Rate (ARP)</Text>
          </GridItem>
          <GridItem colSpan="2" pt={2} rowSpan="1">
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
          <GridItem ml={5} mr={12} pr={1} colSpan="5" rowSpan="1">
          <Slider name='interestRate' id='interestRateSlider' 
          value={interestRate} 
          min= {calcType ? montlyLoansConstraints.minInterest  : yearlyLoansConstraints.minInterest } 
          max= {calcType ? montlyLoansConstraints.maxInterest : yearlyLoansConstraints.maxInterest} 
          step= {calcType ? montlyLoansConstraints.interestSteps : yearlyLoansConstraints.interestSteps} 
          onChange={(val) => setInterestRate(val) }>
              <SliderTrack bg="grey">
                <Box position="relative" right={10} />
                <SliderFilledTrack bg={colorStyle} />
              </SliderTrack>
              <SliderThumb boxSize={'max'} p={3} color='black'> {interestRate}%</SliderThumb>
            </Slider>
          </GridItem>


        </Grid>
    </Box>
    </Container>
    </>
  );
};
export default PaymentCalculator;