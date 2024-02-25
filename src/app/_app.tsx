import "styles/globals.scss";
import React from "react";
function RootApp({ Component, pageProps }: any) {
  return (
    <React.Fragment>
      <Component {...pageProps} />
    </React.Fragment>
  );
}
export default RootApp;
