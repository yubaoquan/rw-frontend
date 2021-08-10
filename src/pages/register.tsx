/* eslint-disable react/no-array-index-key */
import Cookie from 'js-cookie';
import { FC, useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { register } from 'api/user';

const registerPage: FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleUsernameChange = (e: FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const commonAfter = (user: any) => {
    Cookie.set('user', user);

    // TODO:store set user
    // setUser(user);
    history.push('/');
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      console.info(username, email, password);
      setLoading(true);
      const res = await register({ username, email, password });
      console.info(res);
      commonAfter(res.data.user);
    } catch (err: any) {
      console.error(err);
      console.info(err.response?.data);
      setError(err.response?.data?.error || error);
    } finally {
      setLoading(false);
    }
  };

  console.info('errors:', error);

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="login">Have an account?</Link>
            </p>

            {error && (
            <ul className="error-messages">
              <li>{error}</li>
            </ul>
            )}

            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  required
                  disabled={loading}
                  value={username}
                  onChange={handleUsernameChange}
                />
              </fieldset>
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
                type="submit"
                disabled={loading}
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default registerPage;
