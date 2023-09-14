import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import FormInput from "@/components/FormInput";
import Select from "@/components/Select";
import ComboBox from "@/components/ComboBox";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { useState, useEffect } from "react";
import axios from 'axios';
import { EXTERNALDATA_URL } from "@/config/apiEndPoints";
import { REGIONS, INSTANCE_FAMILIES, PRODUCT_DESCRIPTIONS, PRODUCT_TYPES, TENANCIES, PLANS } from "@/config/constants";
import Papa from 'papaparse';

interface IForm {
  region: string;
  instanceFamily: string;
  instanceType: string;
  productDescription: string;
  productType: string;
  tenancy: string;
  usageType: string;
  plan: string;
  usage: number;
  quantity: number;
}

const Calculation = () => {
  const methods = useForm<IForm>();
  const calculate = () => {
    return true;
  }

  const [savingsData, setSavingsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [option, setOption] = useState<IForm>({
    region: 'af-south-1',
    instanceFamily: 'Not specified',
    instanceType: 'Not specified',
    productDescription: 'Not specified',
    productType: 'EC2',
    tenancy: 'shared',
    usageType: '',
    plan: '1 year No Upfront Compute Savings Plan',
    usage: 0,
    quantity: 0
  });
  const [instanceTypes, setInstanceTypes] = useState<string[]>([]);

  const initialize = (response: any) => {
    const resData = Papa.parse(response.data, { header: true }).data;
    setSavingsData(resData);
    setIsLoading(false);
    const dupInstanceTypes: string[] = [];
    resData.forEach((row: any) => {
      const instanceType = row.instance_type;
      if (!(instanceType === undefined || dupInstanceTypes.includes(instanceType))) {
        dupInstanceTypes.push(instanceType);
      }
    });
    const instanceTypeSet = new Set(dupInstanceTypes);
    setInstanceTypes(Array.from(instanceTypeSet));
    console.log(Array.from(instanceTypeSet))
  }

  const possibleUsageTypes = (): string[] => {
    const customOption = { ...option };
    if (customOption.instanceType === 'Not specified') customOption.instanceType = '';
    if (customOption.productDescription === 'Not specified') customOption.productDescription = '';
    console.log(customOption);
    console.log(savingsData);
    const possibleRows = savingsData.filter((row: any) => {
      return (
        row.region == customOption.region &&
        row.instance_type == customOption.instanceType &&
        row.product_description == customOption.productDescription &&
        row.product_type == customOption.productType &&
        row.tenancy == customOption.tenancy &&
        row.plan_description == customOption.plan
      );
    });
    console.log(possibleRows);
    const possibleTypes:string[] = [];
    possibleRows.forEach(row=> {
      const usageType = row.usage_type;
      if(!(usageType === undefined || possibleTypes.includes(usageType))) {
        possibleTypes.push(usageType);
      }
    })
    const usageTypeSet = new Set(possibleTypes);
    console.log("dfdf",Array.from(usageTypeSet));
    return (Array.from(usageTypeSet));
  }

  const handleRegion = (region: string) => {
    const updateRegion = { ...option };
    updateRegion.region = region;
    setOption(updateRegion);
    console.log(possibleUsageTypes());
  }

  const handleInstanceFamily = (instanceFamily: string) => {
    const updateInstanceFamily = { ...option };
    updateInstanceFamily.instanceFamily = instanceFamily;
    setOption(updateInstanceFamily);
  }

  const handleInstanceType = (instanceType: string) => {

  }

  const handleProductDescription = (productDescription: string) => {

  }

  const handleProductType = (productionType: string) => {

  }

  const handleTenancy = (tenancy: string) => {

  }

  const handleUsageType = (usageType: string) => {

  }

  const handlePlan = (plan: string) => {

  }

  useEffect(() => {
    axios.get(EXTERNALDATA_URL)
      .then((response) => {
        initialize(response);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <FormProvider {...methods}>
          <div className="mx-64 my-16 flex">
            <form
              className="w-full flex-1 flex flex-col space-y-2"
              noValidate
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="w-1/2">
                <Select label="Region" data={REGIONS} handler={handleRegion} />
              </div>
              <div>
                <div className="w-1/2 flex flex-row">
                  <Select label="Instance Family" data={INSTANCE_FAMILIES} handler={handleInstanceFamily} />
                  <Select
                    label="Instance Type"
                    data={
                      option.instanceFamily === 'Not specified' ?
                        ['Not specified'] :
                        instanceTypes.filter(instanceType => instanceType.startsWith(option.instanceFamily + ".")).sort()}
                    handler={handleInstanceType} />
                </div>
              </div>
              <Select label="Product Description" data={PRODUCT_DESCRIPTIONS} handler={handleProductDescription} />
              <Select label="Product Type" data={PRODUCT_TYPES} handler={handleProductType} />
              <Select label="Tenancy" data={TENANCIES} handler={handleTenancy} />
              <Select label="Usage Type" data={possibleUsageTypes()} handler={handleUsageType} />
              <Select label="Plan" data={PLANS} handler={handlePlan} />
              {/* <FormInput type="text" name="usage" /> */}
              <FormInput type="number" name="quantity" />
              <ComboBox label="" data={[]} />
              <Button label="Calculate Savings" handler={calculate} />
            </form>
            <div className="flex-1">

            </div>
          </div>
        </FormProvider>
      )}
    </div>
  );
};

export default Calculation;
