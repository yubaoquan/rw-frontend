/* eslint-disable react/no-array-index-key */
import Cookie from 'js-cookie';
import { observer } from 'mobx-react-lite';
import { FC, useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { login } from 'api/user';
import UserStore from 'store/user';
import { FormErrors } from 'types';

interface Props {
  userStore: UserStore;
}

const loginPage: FC<Props> = observer(({ userStore }) => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const commonAfter = (user: any) => {
    Cookie.set('user', JSON.stringify(user));
    userStore.setUser(user);
    history.push('/');
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await login({ email, password });
      console.info(res);
      commonAfter(res.data.user);
    } catch (err: any) {
      console.error(err);
      setErrors(err.response?.data?.errors || errors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>

            <ul className="error-messages">
              {
                Object.entries(errors)
                  .map(([prop, value]: any) => (value as string[])
                    .map((message, index) => <li key={index}>{{ prop }}: {{ message }}</li>))
              }
            </ul>

            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  required
                  minLength={8}
                  disabled={loading}
                  value={email}
                  onChange={handleEmailChange}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  required
                  disabled={loading}
                  value={password}
                  onChange={handlePasswordChange}
                />
              </fieldset>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                disabled={loading}
                type="submit"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

export default loginPage;
