import React from "react";

import { mount } from "enzyme";

import LandingPage from "../pages/LandingPage";
import AuthProvider from "../providers/AuthProvider";
import LoginForm from "../components/landing-page/LoginForm";
import RegisterForm from "../components/landing-page/RegisterForm";
import UpdateMessage from "../components/UpdateMessage";
import { FaTree } from "react-icons/fa";

describe("Frontend Auth Testing", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <AuthProvider>
        <LandingPage />
      </AuthProvider>
    );
  });

  // shallow renders
  test("render a logo container", () => {
    expect(wrapper.find(".logo-container")).toHaveLength(1);
  });

  test("render a form container", () => {
    expect(wrapper.find(".form-container")).toHaveLength(1);
  });

  test("render a button container", () => {
    expect(wrapper.find(".button-container")).toHaveLength(1);
  });

  test("render the app name", () => {
    expect(wrapper.find("h1").at(1).text()).toContain("ecoECHO");
  });

  test("render <LoginForm /> on page load", () => {
    expect(wrapper.find(LoginForm)).toHaveLength(1);
  });

  test("should not render <RegisterForm /> on page load", () => {
    expect(wrapper.find(RegisterForm)).toHaveLength(0);
  });

  test("should have two buttons", () => {
    expect(wrapper.find("button")).toHaveLength(3);
  });

  test("should have a Login Button", () => {
    expect(wrapper.find("button").at(0).text()).toContain("Login");
  });

  test("should have a Register Button", () => {
    expect(wrapper.find("button").at(1).text()).toContain("Register");
  });

  test("should have a Submit Button", () => {
    expect(wrapper.find("button").at(2).text()).toContain("Submit");
  });

  test("should not display any status update messages on render", () => {
    expect(wrapper.find("UpdateMessage")).toHaveLength(0);
  });

  test("should have <FaTree /> logo on render", () => {
    expect(wrapper.find(FaTree)).toHaveLength(1);
  });

  // DOM events
  test("should switch forms when appropriate button is clicked", () => {
    expect(wrapper.find("button").at(1).text()).toContain("Register");
    wrapper.find("button").at(1).simulate("click");
    expect(wrapper.find(LoginForm)).toHaveLength(0);
    expect(wrapper.find(RegisterForm)).toHaveLength(1);
    wrapper.find("button").at(0).simulate("click");
    expect(wrapper.find(RegisterForm)).toHaveLength(0);
    expect(wrapper.find(LoginForm)).toHaveLength(1);
  });

  test("<LoginForm /> should allow input changes", () => {
    expect(wrapper.find(LoginForm)).toHaveLength(1);
    expect(wrapper.find("input").at(0).text()).toContain("");
    expect(wrapper.find("input").at(1).text()).toContain("");
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "charlie@test.com" } });
    wrapper
      .find("input")
      .at(1)
      .simulate("change", { target: { value: "dayman" } });
    expect(wrapper.find("input").get(0).props.value).toEqual(
      "charlie@test.com"
    );
    expect(wrapper.find("input").get(1).props.value).toEqual("dayman");
  });

  test("<RegisterForm /> should allow input changes", () => {
    wrapper.find("button").at(1).simulate("click");
    expect(wrapper.find(RegisterForm)).toHaveLength(1);
    expect(wrapper.find("input").at(0).text()).toContain("");
    expect(wrapper.find("input").at(1).text()).toContain("");
    expect(wrapper.find("input").at(2).text()).toContain("");
    expect(wrapper.find("input").at(3).text()).toContain("");
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "test 1" } });
    wrapper
      .find("input")
      .at(1)
      .simulate("change", { target: { value: "test1@test.com" } });
    wrapper
      .find("input")
      .at(2)
      .simulate("change", { target: { value: "test1" } });
    wrapper
      .find("input")
      .at(3)
      .simulate("change", { target: { value: "test1" } });
    expect(wrapper.find("input").get(0).props.value).toEqual("test 1");
    expect(wrapper.find("input").get(1).props.value).toEqual("test1@test.com");
    expect(wrapper.find("input").get(2).props.value).toEqual("test1");
    expect(wrapper.find("input").get(3).props.value).toEqual("test1");
  });

  test("Login cycle should successfully call handleSubmit", () => {
    global.window = { location: { pathname: "/" } };
    expect(wrapper.find(LoginForm)).toHaveLength(1);
    expect(wrapper.find("input").at(0).text()).toContain("");
    expect(wrapper.find("input").at(1).text()).toContain("");
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "charlie@test.com" } });
    wrapper
      .find("input")
      .at(1)
      .simulate("change", { target: { value: "dayman" } });
    expect(wrapper.find("input").get(0).props.value).toEqual(
      "charlie@test.com"
    );
    expect(wrapper.find("input").get(1).props.value).toEqual("dayman");
    wrapper.find("button").at(2).simulate("click");
    expect(wrapper.find("#login-form")).toHaveLength(1);
    wrapper
      .find("#login-form")
      .invoke("onSubmit")()
      .then(() => {
        expect(handleSubmit).toBeCalled();
        expect(global.window.location.pathname).toEqual("/home");
      });
  });

  test("Register cycle should successfully call handleSubmit", () => {
    global.window = { location: { pathname: "/" } };
    wrapper.find("button").at(1).simulate("click");
    expect(wrapper.find(RegisterForm)).toHaveLength(1);
    expect(wrapper.find("input").at(0).text()).toContain("");
    expect(wrapper.find("input").at(1).text()).toContain("");
    expect(wrapper.find("input").at(2).text()).toContain("");
    expect(wrapper.find("input").at(3).text()).toContain("");
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "test 1" } });
    wrapper
      .find("input")
      .at(1)
      .simulate("change", { target: { value: "test1@test.com" } });
    wrapper
      .find("input")
      .at(2)
      .simulate("change", { target: { value: "test1" } });
    wrapper
      .find("input")
      .at(3)
      .simulate("change", { target: { value: "test1" } });
    expect(wrapper.find("input").get(0).props.value).toEqual("test 1");
    expect(wrapper.find("input").get(1).props.value).toEqual("test1@test.com");
    expect(wrapper.find("input").get(2).props.value).toEqual("test1");
    expect(wrapper.find("input").get(3).props.value).toEqual("test1");
    wrapper.find("button").at(2).simulate("click");
    expect(wrapper.find("#register-form")).toHaveLength(1);
    wrapper
      .find("#register-form")
      .invoke("onSubmit")()
      .then(() => {
        expect(handleSubmit).toBeCalled();
        expect(global.window.location.pathname).toEqual("/home");
      });
  });
});
