import { useForm, FormProvider } from "react-hook-form";
import Head from "next/head";
import FormInput from "@/components/FormInput";
import Select from "@/components/Select";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { EXTERNALDATA_URL } from "@/config/apiEndPoints";
import { REGIONS, UNITS, NOT_SPECIFIED } from "@/config/constants";
import Savings from "@/components/Savings";
import Papa from "papaparse";

interface IForm {
  region: string;
  instanceFamily: string;
  instanceType: string;
  productDescription: string;
  productType: string;
  tenancy: string;
  unit: string;
  usageType: string;
  plan: string;
  usage: number;
  quantity: number;
}

interface IFilter {
  [key: string]: string;
}

const Calculation = () => {
  const methods = useForm<IForm>();
  const calculate = () => {
    return true;
  };

  useEffect(() => {
    axios
      .get(EXTERNALDATA_URL)
      .then((response) => {
        initialize(response);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, []);

  const [savingsData, setSavingsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [unit, setUnit] = useState("Hrs");
  const [usage, setUsage] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [usageType, setUsageType] = useState("");
  const [tenancy, setTenancy] = useState("shared");
  const [region, setRegion] = useState("");
  const [productType, setProductType] = useState("Lambda");
  const [instanceType, setInstanceType] = useState(NOT_SPECIFIED);
  const [instanceFamily, setInstanceFamily] = useState(NOT_SPECIFIED);
  const [plan, setPlan] = useState("1 year No Upfront Compute Savings Plan");
  const [productDescription, setProductDescription] = useState(NOT_SPECIFIED);

  const initialize = (response: any) => {
    const data = Papa.parse(response.data, { header: true }).data;
    data.pop(); // eliminate the last row which is a garbage
    data.forEach((row: any) => {
      if (row.instance_family === "") {
        row.instance_family = NOT_SPECIFIED;
        row.instance_type = NOT_SPECIFIED;
        row.product_description = NOT_SPECIFIED;
      }
    });
    setSavingsData(data);
    setIsLoading(false);
    setRegion("af-south-1");
  };

  const getUniqueValues = (rows: any[], field: string): string[] => {
    const dupValues = rows.map((row: any) => row[field]);
    const valueSet = new Set(dupValues);
    return Array.from(valueSet);
  };

  const getFilteredValues = (filters: IFilter, key: string) => {
    return getUniqueValues(
      savingsData.filter((row: any) => {
        let flag = true;
        Object.keys(filters).forEach((key) => {
          flag = flag && row[key] === filters[key];
        });
        return flag;
      }),
      key
    );
  };

  const productDescriptions = useMemo(() => {
    const filteredProductDescriptions = getFilteredValues(
      {
        region: region,
      },
      "product_description"
    );
    setProductDescription(filteredProductDescriptions[0] ?? "");
    return filteredProductDescriptions;
  }, [region]);

  const productTypes = useMemo(() => {
    const filteredProductTypes = getFilteredValues(
      {
        region: region,
        product_description: productDescription,
        // instance_type: instanceType,
        // instance_family: instanceFamily,
      },
      "product_type"
    );
    setProductType(filteredProductTypes[0] ?? "");
    return filteredProductTypes;
  }, [region, productDescription]);

  const instanceFamilies = useMemo(() => {
    const filteredInstanceFamilies = getFilteredValues(
      {
        region: region,
        product_description: productDescription,
        product_type: productType,
      },
      "instance_family"
    );
    setInstanceFamily(filteredInstanceFamilies[0] ?? "");
    return filteredInstanceFamilies;
  }, [region, productDescription, productType]);

  const instanceTypes = useMemo(() => {
    const filteredInstanceTypes = getFilteredValues(
      {
        region: region,
        product_description: productDescription,
        product_type: productType,
        instance_family: instanceFamily,
      },
      "instance_type"
    );
    setInstanceType(filteredInstanceTypes[0] ?? "");
    return filteredInstanceTypes;
  }, [region, productDescription, productType, instanceFamily]);

  const tenancies = useMemo(() => {
    const filteredTenancies = getFilteredValues(
      {
        region: region,
        product_description: productDescription,
        product_type: productType,
        instance_type: instanceType,
        instance_family: instanceFamily,
      },
      "tenancy"
    );
    setTenancy(filteredTenancies[0] ?? "");
    return filteredTenancies;
  }, [region, productDescription, productType, instanceType, instanceFamily]);

  const plans = useMemo(() => {
    const filteredPlans = getFilteredValues(
      {
        region: region,
        product_description: productDescription,
        product_type: productType,
        instance_type: instanceType,
        instance_family: instanceFamily,
        tenancy: tenancy,
      },
      "plan_description"
    );
    setPlan(filteredPlans[0] ?? "");
    return filteredPlans;
  }, [
    region,
    productDescription,
    productType,
    instanceType,
    instanceFamily,
    tenancy,
  ]);

  const usageTypes = useMemo(() => {
    const filteredUsageTypes = getFilteredValues(
      {
        region: region,
        product_description: productDescription,
        product_type: productType,
        instance_type: instanceType,
        instance_family: instanceFamily,
        tenancy: tenancy,
        plan_description: plan,
      },
      "usage_type"
    );
    setUsageType(filteredUsageTypes[0] ?? "");
    return filteredUsageTypes;
  }, [
    region,
    productDescription,
    productType,
    instanceFamily,
    instanceType,
    tenancy,
    plan,
  ]);

  const units = useMemo(() => {
    const filteredUnits = getFilteredValues(
      {
        region: region,
        product_description: productDescription,
        product_type: productType,
        instance_type: instanceType,
        instance_family: instanceFamily,
        tenancy: tenancy,
        plan_description: plan,
        usage_type: usageType,
      },
      "unit"
    );
    setUnit(filteredUnits[0] ?? "");
    return filteredUnits;
  }, [
    region,
    productDescription,
    productType,
    instanceFamily,
    instanceType,
    tenancy,
    plan,
    usageType,
  ]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Head>
            <title>Savings Calculator</title>
          </Head>
          <div
            className="
            flex
            max-w-7xl 
            mx-auto 
            flex-col
            md:flex-row
            px-4 sm:px-6 lg:px-8
            py-4 md:py-16
            space-x-0 md:space-x-6 lg:space-x-16 
            space-y-16 md:space-y-0
          "
          >
            <FormProvider {...methods}>
              <form
                className="w-full flex-1 flex flex-col space-y-2"
                noValidate
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="flex justify-end">
                  <div className="w-1/2">
                    <Select
                      label="Region"
                      data={REGIONS}
                      selected={region}
                      setSelected={setRegion}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Select
                        label="Product Description"
                        data={productDescriptions}
                        selected={productDescription}
                        setSelected={setProductDescription}
                      />
                    </div>
                    <div className="flex-1">
                      <Select
                        label="Product Type"
                        data={productTypes}
                        selected={productType}
                        setSelected={setProductType}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Select
                        label="Instance Family"
                        data={instanceFamilies}
                        selected={instanceFamily}
                        setSelected={setInstanceFamily}
                      />
                    </div>
                    <div className="flex-1">
                      <Select
                        label="Instance Type"
                        data={instanceTypes}
                        selected={instanceType}
                        setSelected={setInstanceType}
                      />
                    </div>
                  </div>
                </div>
                <Select
                  label="Tenancy"
                  data={tenancies}
                  selected={tenancy}
                  setSelected={setTenancy}
                />
                <Select
                  label="Plan"
                  data={plans}
                  selected={plan}
                  setSelected={setPlan}
                />
                <Select
                  label="Usage Type"
                  data={usageTypes}
                  selected={usageType}
                  setSelected={setUsageType}
                />
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <FormInput type="number" name="usage" label="Usage" />
                  </div>
                  <div className="flex-1">
                    <Select
                      label="Unit"
                      data={units}
                      selected={unit}
                      setSelected={setUnit}
                    />
                  </div>
                  <div className="flex-1">
                    <FormInput type="number" name="quantity" label="Quantity" />
                  </div>
                </div>
                <Button label="Calculate Savings" handler={calculate} />
              </form>
            </FormProvider>
            <Savings />
          </div>
        </div>
      )}
    </>
  );
};

export default Calculation;
