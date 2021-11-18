import React from "react";

const ChannelListCustom = ({ children, error = false, loading, type }) => {
  if (error) {
    return type === "team" ? (
      <div>Connection Error! Please try again!</div>
    ) : null;
  }

  if (loading) {
    return <div>{type === "team" ? "Channels " : "Messages"} loading....</div>;
  }

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

export default ChannelListCustom;
