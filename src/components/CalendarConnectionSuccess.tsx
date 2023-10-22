import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { Card, CardBody } from "@nextui-org/react";

import CheckImage from "../assets/check.png";

interface CalendarConnectionSuccessProps {
  step: number;
}

export const CalendarConnectionSuccess: FC<CalendarConnectionSuccessProps> = ({
  step,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);

  return (
    <motion.div
      className="max-w-[90vw]"
      key={step}
      initial={{ opacity: 0, x: -1000 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 1000 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <CardBody className="p-12 w-[360px] items-center flex flex-col">
          <img src={CheckImage} alt="Success" className="h-24 w-24" />
          <h4 className="text-md text-center mt-8">Calendar Connected!</h4>
          <span className="text-sm text-gray-500 text-center mt-2">
            Redirecting you to your dashboard...
          </span>
        </CardBody>
      </Card>
    </motion.div>
  );
};
