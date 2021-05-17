import React from "react";

const Heading = (props) => {
  const { type, children } = props;

  const classes = `font-serif text-black-light ${headingType[type]}`;

  const renderSwitch = (type) => {
    switch (type) {
      case "h1":
        return (
          <h1 className={classes} {...props}>
            {children}
          </h1>
        );
      case "h2":
        return (
          <h2 className={classes} {...props}>
            {children}
          </h2>
        );
      case "h3":
        return (
          <h3 className={classes} {...props}>
            {children}
          </h3>
        );
      case "h4":
        return (
          <h4 className={classes} {...props}>
            {children}
          </h4>
        );
      default:
        return (
          <h1 className={classes} {...props}>
            {children}
          </h1>
        );
    }
  };
  return renderSwitch(type);
};

const headingType = {
  h1: `
  text-5xl
  `,
  h2: `
  text-3xl
  `,
  h3: `
  text-2xl leading-normal
  `,
  h4: `
  text-lg font-bold leading-snug
  `,
};

export default Heading;