import { FastifyReply, FastifyRequest } from "fastify";

export async function refreshController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await request.jwtVerify({ onlyCookie: true });

  const token = await reply.jwtSign(
    { accessToken: true },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "10m",
      },
    }
  );

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "7d",
      },
    }
  );

  return reply
    .status(200)
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .send({
      token,
    });
}
