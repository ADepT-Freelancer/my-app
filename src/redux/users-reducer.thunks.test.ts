import { ResponseTypeAPI, ResultCodeEnum } from "../api/api";
import { usersAPI } from "../api/users-api";
import { follow, unfollow } from "./users-reducer";

jest.mock("../api/users-api");
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const result: ResponseTypeAPI = {
  resultCode: ResultCodeEnum.success,
  data: {},
  messages: [],
};

usersAPIMock.follow.mockReturnValue(Promise.resolve(result));

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  usersAPIMock.follow.mockClear();
  usersAPIMock.unfollow.mockClear();
});

// eslint-disable-next-line jest/valid-title
test("follow thunk", async () => {
  const thunk = follow(1);

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(3);
});

// eslint-disable-next-line jest/valid-title
test("unfollow thunk", async () => {
  const thunk = unfollow(1);

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(3);
});
