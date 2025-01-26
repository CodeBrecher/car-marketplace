import React from 'react';
import { 
  FaCar, FaCheckCircle, FaIndustry, FaCarSide, FaCalendarAlt, FaRoad, 
  FaCogs, FaGasPump, FaTachometerAlt, FaWrench, FaCircle, FaPalette, FaDoorClosed 
} from 'react-icons/fa';
import carSpecification from '@/Data/carSpecification'; // Assuming correct import

function Specification({ carDetail }) {
  console.log(carDetail);

  // Icon mapping based on the icon name in the carSpecification data
  const iconMap = {
    FaCar,
    FaCheckCircle,
    FaIndustry,
    FaCarSide,
    FaCalendarAlt,
    FaRoad,
    FaCogs,
    FaGasPump,
    FaTachometerAlt,
    FaWrench,
    FaCircle,
    FaPalette,
    FaDoorClosed,
  };

  return (
    <div className="p-10 rounded-xl border shadow-md mt-7">
      <h2 className="font-medium text-2xl">Specifications</h2>

      {/* Loop through CarSpecification and render each item */}
      {carSpecification.map((item, index) => {
        const Icon = iconMap[item.icon]; // Dynamically map the icon from the iconMap

        return (
          <div key={index} className="mt-5 flex items-center justify-between">
            <h2 className="flex gap-2">
              {Icon && <Icon className="text-xl text-blue-600" />} {/* Blue icon */}
              <span>{item.label}: </span>
              <span>{carDetail[item.name]}</span>
            </h2>
          </div>
        );
      })}
    </div>
  );
}

export default Specification;
