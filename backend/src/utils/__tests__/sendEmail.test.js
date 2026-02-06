const nodemailer = require("nodemailer");
const sendEmail = require("../sendEmail");

jest.mock("nodemailer");

describe("sendEmail util", () => {

  beforeEach(() => {
    nodemailer.createTransport.mockReturnValue({
      sendMail: jest.fn().mockResolvedValue(true),
    });
  });

  test("should send email successfully", async () => {
    await sendEmail("test@mail.com", "Subject", "Hello");

    const transport = nodemailer.createTransport();
    expect(transport.sendMail).toHaveBeenCalled();
  });

  test("should handle sendMail failure", async () => {
    nodemailer.createTransport.mockReturnValue({
      sendMail: jest.fn().mockRejectedValue(new Error("fail")),
    });

    await expect(
      sendEmail("test@mail.com", "Subject", "Hello")
    ).rejects.toThrow("fail");
  });

});
