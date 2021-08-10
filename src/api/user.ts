import { request } from 'utils/request';

interface UserForLogin {
  email: string;
  password: string;
}

interface UserForRegister {
  username: string;
  email: string;
  password: string;
}

interface Profile {
  email: string;
  username: string;
  password: string;
  bio: string;
  image: string;
}

function login(user: UserForLogin) {
  return request({
    url: '/users/login',
    method: 'post',
    data: {
      user: {
        email: user.email,
        password: user.password,
      },
    },
  });
}

function register(user: UserForRegister) {
  return request({
    url: '/users',
    method: 'post',
    data: {
      user: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    },
  });
}

function follow(username: string) {
  return request({
    url: `/profiles/${username}/follow`,
    method: 'POST',
  });
}

function unfollow(username: string) {
  return request({
    url: `/profiles/${username}/follow`,
    method: 'DELETE',
  });
}

function updateProfile({ email, username, password, bio, image }: Profile) {
  return request({
    url: '/user',
    method: 'PUT',
    data: {
      user: {
        image,
        bio,
        email,
        username,
        password,
      },
    },
  });
}

function fetchProfile(username: string) {
  return request({
    url: `/profiles/${username}`,
    method: 'GET',
  });
}

export { login, register, follow, unfollow, updateProfile, fetchProfile };
