import React from "react";
import styles from "./CssModule/AppLayout.module.css";




export const AppLayout = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
  <div className={styles.layout}>{props.children}
    
  </div>
);
