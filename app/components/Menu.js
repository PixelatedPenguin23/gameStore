'use client'
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Input,
  Radio,
  Divider,
  Typography,
  message,
  Select,
  InputNumber,
  DatePicker,
  Checkbox,
} from "antd";
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { gsap } from "gsap";

const { Title, Text } = Typography;
const { Option } = Select;

export default function FullscreenMenu() {
  const [visible, setVisible] = useState(false);
  const [count1, setCount1] = useState(1);
  const [count2, setCount2] = useState(1);
  const [activeTab, setActiveTab] = useState("discount");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [cards, setCards] = useState(["6037*********1234"]);

  const modalRef = useRef(null);

  const price = 230000;
  const total = (count1 + count2) * price * (discountApplied ? 0.9 : 1);

  // GSAP animation
  useEffect(() => {
    if (visible && modalRef.current) {
      const q = gsap.utils.selector(modalRef);
      gsap.fromTo(
        q(".animate-in"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "power3.out",
          duration: 0.6,
        }
      );
    }
  }, [visible]);

  const applyDiscount = () => {
    setDiscountApplied(true);
    message.success("کد تخفیف با موفقیت اعمال شد ✅");
  };

  const addCard = () => {
    setCards([...cards, "6037*********" + Math.floor(1000 + Math.random() * 9000)]);
    message.success("کارت جدید اضافه شد 💳");
  };

  const renderRightSection = () => {
    switch (activeTab) {
      case "discount":
        return (
          <div className="animate-in flex flex-col gap-4">
            <Title level={5}>کد تخفیف</Title>
            <div className="flex gap-2">
              <Input size="large" placeholder="کد تخفیف خود را وارد کنید" />
              <Button type="primary" size="large" onClick={applyDiscount}>
                اعمال
              </Button>
            </div>
            {discountApplied && (
              <Text type="success" className="block">
                تخفیف لحاظ شد 🎉
              </Text>
            )}
            <Divider className="my-2" />
            <Title level={5}>هزینه نهایی</Title>
            <Text className="text-lg font-semibold block mt-1">
              {total.toLocaleString()} تومان
            </Text>
            <Button type="primary" block size="large">
              ثبت سفارش
            </Button>
          </div>
        );

      case "wallet":
        return (
          <div className="animate-in flex flex-col gap-3">
            <Title level={5}>پرداخت از کیف پول</Title>
            <Input size="large" placeholder="شناسه کیف پول" />
            <Input size="large" placeholder="کد امنیتی" />
            <Divider className="my-2" />
            <Title level={5}>انتخاب درگاه</Title>
            <Radio.Group defaultValue="saman" className="flex flex-col gap-2">
              <Radio value="saman">بانک سامان</Radio>
              <Radio value="mellat">بانک ملت</Radio>
              <Radio value="zarinpal">زرین پال</Radio>
            </Radio.Group>
            <Divider className="my-2" />
            <Button type="primary" block size="large">
              پرداخت از کیف پول
            </Button>
          </div>
        );

      case "currency":
        return (
          <div className="animate-in flex flex-col gap-3">
            <Title level={5}>درگاه ارزی</Title>
            <Select placeholder="انتخاب ارز" className="w-full" size="large">
              <Option value="usd">USD</Option>
              <Option value="eur">EUR</Option>
              <Option value="usdt">USDT</Option>
            </Select>
            <Input size="large" placeholder="آدرس کیف پول ارزی" />
            <InputNumber
              className="w-full"
              size="large"
              placeholder="مبلغ مورد نظر"
              addonAfter="واحد"
            />
            <Divider className="my-2" />
            <Input size="large" placeholder="کد تأیید ایمیل" />
            <Button type="primary" block size="large">
              پرداخت ارزی
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <Button
        icon={<ShoppingCartOutlined />}
        type="primary"
        size="large"
        onClick={() => setVisible(true)}
      >
        سبد خرید
      </Button>

      {visible && (
        <div
          dir="rtl"
          className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto p-6"
          ref={modalRef}
        >
          <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
            <div className="flex justify-between items-center mb-4 animate-in">
              <Title level={3} className="!m-0">
                تکمیل خرید
              </Title>
              <Button
                icon={<CloseOutlined />}
                type="text"
                onClick={() => setVisible(false)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Left: سبد خرید */}
              <div className="border border-gray-100 rounded-lg p-4 shadow-sm animate-in flex flex-col gap-2">
                <Title level={5}>سبد خرید شما</Title>
                {[count1, count2].map((count, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b border-gray-200 py-2"
                  >
                    <div>
                      <Text className="block font-medium">گیفت کارت</Text>
                      <Text type="secondary" className="text-sm">
                        {price.toLocaleString()} تومان
                      </Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="small"
                        onClick={() =>
                          i === 0
                            ? setCount1(Math.max(1, count - 1))
                            : setCount2(Math.max(1, count - 1))
                        }
                      >
                        -
                      </Button>
                      <span>{count}</span>
                      <Button
                        size="small"
                        onClick={() =>
                          i === 0
                            ? setCount1(count + 1)
                            : setCount2(count + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                    <Button type="text" icon={<DeleteOutlined />} danger />
                  </div>
                ))}
                <div className="flex justify-between pt-2">
                  <Text strong>جمع کل:</Text>
                  <Text strong>{total.toLocaleString()} تومان</Text>
                </div>
              </div>

              {/* Middle: اطلاعات پرداخت */}
              <div className="border border-gray-100 rounded-lg p-4 shadow-sm animate-in flex flex-col gap-2">
                <Title level={5}>اطلاعات پرداخت</Title>
                <Input size="large" placeholder="آدرس آی‌پی شما" />
                <Input size="large" placeholder="شماره همراه" />
                <Input size="large" placeholder="شماره ثابت" />
                <Input size="large" placeholder="کد ملی" />
                <DatePicker
                  size="large"
                  className="w-full"
                  placeholder="تاریخ تولد"
                  format="YYYY/MM/DD"
                />
                <Divider className="my-1" />
                <Checkbox>تأیید می‌کنم اطلاعات وارد شده صحیح است</Checkbox>
                <Divider className="my-1" />
                <Title level={5}>نوع کاربر</Title>
                <Radio.Group defaultValue="normal" className="flex gap-4 mt-1">
                  <Radio value="normal">عادی</Radio>
                  <Radio value="vip">ویژه</Radio>
                </Radio.Group>
                <Divider className="my-1" />
                <Title level={5}>کارت‌های بانکی احراز شده</Title>
                {cards.map((card, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-gray-50 rounded-md px-3 py-2"
                  >
                    <Text>{card}</Text>
                    <Text type="success">✅</Text>
                  </div>
                ))}
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  className="mt-2"
                  onClick={addCard}
                >
                  افزودن کارت جدید
                </Button>
              </div>

              {/* Right: Tabs */}
              <div className="border border-gray-100 rounded-lg p-4 shadow-sm animate-in flex flex-col gap-2">
                <div className="flex justify-between mb-2">
                  <Button
                    type={activeTab === "discount" ? "primary" : "default"}
                    onClick={() => setActiveTab("discount")}
                    className="flex-1 mx-1"
                  >
                    کد تخفیف
                  </Button>
                  <Button
                    type={activeTab === "wallet" ? "primary" : "default"}
                    onClick={() => setActiveTab("wallet")}
                    className="flex-1 mx-1"
                  >
                    کیف پول
                  </Button>
                  <Button
                    type={activeTab === "currency" ? "primary" : "default"}
                    onClick={() => setActiveTab("currency")}
                    className="flex-1 mx-1"
                  >
                    درگاه ارزی
                  </Button>
                </div>

                {renderRightSection()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
