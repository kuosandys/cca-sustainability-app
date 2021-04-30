import React, { Suspense } from "react";
import PropTypes from "prop-types";

import { PageContainer } from "components/Presentation";
import RecipeResults from "components/RecipeResults/RecipeResults";

const ResultsSection = ({ expandedMenu }) => {
  return (
    <div className="relative">
      {expandedMenu !== "" && (
        <div className="absolute w-full min-h-screen h-full bg-black opacity-60 "></div>
      )}
      <PageContainer className="pt-14">
        <Suspense fallback={<div>loading</div>}>
          <RecipeResults />
        </Suspense>
      </PageContainer>
    </div>
  );
};

export default ResultsSection;

ResultsSection.propTypes = {
  expandedMenu: PropTypes.string,
};
