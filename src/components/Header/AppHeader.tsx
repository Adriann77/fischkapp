import React, { useState } from "react";
import styles from "./AppHeader.module.scss";
import { Logo } from "../../../icons/Logo";
import { PlusIcon } from "../../../icons/plusIcon";

interface Props {
  createNewCard: () => void;
  num: number;
}

export const AppHeader = ({ createNewCard, num }: Props) => {
  return (
    <header className={styles.header}>
      <p className={styles.logo}>
        <Logo />
        Cards:<span>{num}</span>
      </p>
      <button onClick={createNewCard} className={styles.buttonIcon}>
        <PlusIcon />
      </button>
    </header>
  );
};
