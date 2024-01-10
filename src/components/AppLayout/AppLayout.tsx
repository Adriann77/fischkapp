import React from "react";
import styles from "./AppLayout.module.scss";

export const AppLayout = (props: React.PropsWithChildren) => (
  <div className={styles.layout}>{props.children}</div>
);
