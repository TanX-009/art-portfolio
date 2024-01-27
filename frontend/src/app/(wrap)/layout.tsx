"use client";

import Footer from "@/components/Footer";
import React, { Component, createContext, ReactNode } from "react";

interface TState {
  isLoggedIn: boolean;
}

interface TProps {
  children: ReactNode;
}

const Context = createContext<
  | {
    context: TState;
    setContext: (value: TState, callback?: () => void) => void;
  }
  | undefined
>(undefined);

export default class WrapperLayout extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  render() {
    const { children } = this.props;

    return (
      <Context.Provider
        value={{
          context: this.state,
          setContext: (value, callback) => {
            if (callback) {
              this.setState(value, callback);
            } else {
              this.setState(value);
            }
          },
        }}
      >
        {children}
        <Footer />
      </Context.Provider>
    );
  }
}

export { Context };
