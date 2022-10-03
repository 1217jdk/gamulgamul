import { FC, useState } from 'react';
import SumPriceChart from '../charts/CalculatorChart';
import type { GoodsInfo } from './DetailSelect';
interface CalculatorProps {
  measure: string;
  goodsProps: GoodsInfo[];
}

const Calculator: FC<CalculatorProps> = props => {
  const { measure, goodsProps } = props;
  console.log(goodsProps);

  const [usingCalculator, setUsingCalculator] = useState<boolean>(false);
  const [goodsPrice, setGoodsPrice] = useState<number>();
  const [goodsMeasure, setGoodsMeasure] = useState<number>();
  const [calculatorData, setCalculatorData] = useState<number>();

  const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const event = e.target.value;
    return setGoodsPrice(Number(event));
  };
  const handleMeasureInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const event = e.target.value;
    return setGoodsMeasure(Number(event));
  };

  const calculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsingCalculator(true);
    console.log(goodsPrice, goodsMeasure);
    return setCalculatorData(goodsPrice);
  };
  return (
    <>
      <div className="mb-3">
        <SumPriceChart calculatorData={calculatorData} goodsData={goodsProps} />
      </div>
      <hr className="mx-[-1.25rem] my-1 mt-5 w-screen" />
      <div className="mt-4 mb-3 flex w-full flex-col">
        <span className="text-lg">
          계산기
          <span className="ml-2 text-xs text-gray-500">
            비교를 원하는 상품의 가격과 용량을 입력해주세요.
          </span>
        </span>
        <div className="m-2">
          <form
            onSubmit={calculate}
            className="flex-rows grid grid-cols-5 grid-rows-2 items-center text-sm"
          >
            <span className="m-1 text-center">상품 가격</span>
            <input
              type="number"
              name="goodsPrice"
              id="goodsPrice"
              onChange={handlePriceInput}
              className="col-span-2 my-1 rounded border-solid border-gray-300 py-1 px-2 text-xs"
            />
            <span className="mx-2 text-sm">원</span>
            <span className="m-1 text-center">상품 용량</span>
            <input
              type="number"
              name="measure"
              id="measure"
              onChange={handleMeasureInput}
              className="col-span-2 my-1 rounded border-solid border-gray-300 px-2 py-1 text-xs"
            />
            <span className="mx-2">{measure}</span>
            <button className="col-start-5 row-span-2 row-start-1 my-2 rounded border border-gray-700 bg-white p-2 sm:text-[0.9rem]">
              계산하기
            </button>
          </form>
          {usingCalculator && (
            <div className="mt-5 text-center">
              가격이 계산되었습니다. 그래프를 확인해주세요.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Calculator;
