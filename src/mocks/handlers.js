import { rest } from "msw";

const baseURL = "https://djangorestframework-api-38c4a098777a.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/usr/`, (req, res, ctx) => {
    return rest(
      ctx.json({
        pk: 2,
        username: "user",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 2,
        profile_image:
          "https://res.cloudinary.com/dmbdqco85/image/upload/v1/media/images/profile_qikwsc",
      }),
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
