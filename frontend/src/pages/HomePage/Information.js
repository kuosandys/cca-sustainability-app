import React from "react";

// Components
import LocationSelectorForm from "pages/HomePage/LocationSelectorForm";
import { PageSectionContainer } from "components/templates";
import { Text, Heading } from "components/atoms";

// Assets
import deliciousMealImage from "assets/images/brooke-lark-nTZOILVZuOg-unsplash-1.png";

const Information = () => {
  return (
    <PageSectionContainer bgClasses="bg-homepage" displayClasses="flex h-112">
      <section className="w-6/12 pt-12">
        <img
          src={deliciousMealImage}
          alt="A Delicious Meal"
          className="my-10 lg:my-0 rounded-md shadow-lg"
        />
      </section>
      <section className="w-6/12 px-12 pt-8 space-y-8 my-auto">
        <Heading type="h2">
          Find out which fruits and vegetables are currently in season.
        </Heading>
        <Text type="xl" variant="medium">
          Select your state below to get started
        </Text>
        <LocationSelectorForm />
      </section>
    </PageSectionContainer>
  );
};

export default Information;
