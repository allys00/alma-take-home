import React, { ElementType } from 'react';

interface SectionTitleProps {
  title: string;
  icon: ElementType;
  description?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  description,
  icon: Icon,
}) => {
  return (
    <>
      <Icon className="text-5xl text-indigo-300" />
      <h2 className="text-xl font-bold">{title}</h2>
      {description && <p className="text-md font-bold">{description}</p>}
    </>
  );
};

export default SectionTitle;
