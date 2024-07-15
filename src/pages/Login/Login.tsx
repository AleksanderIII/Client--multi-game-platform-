import React, { useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { RootState } from "../../store";
import { login as loginUser } from "../../store/slices/auth";

import "./Login.less";

const { Text } = Typography;

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-wrapper">
      <h1>Login</h1>
      <Form name="login-form" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          validateStatus={errors.username ? "error" : ""}
          help={errors.username ? "Please input your username!" : ""}
        >
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          validateStatus={errors.password ? "error" : ""}
          help={errors.password ? "Please input your password!" : ""}
        >
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <Text>
        Don't have an account? <Link to="/register">Register</Link>
      </Text>
    </div>
  );
};

export default Login;
