import EmailService from './EmailService';

const emailService = new EmailService({ config: {} }).build();

describe('Test email Service', () => {
  it('should send email to user', async () => {
    expect(
      async () =>
        await emailService.sendMail('young@gmail.com', 'test', 'test body')
    ).not.toThrow('error');
  });
});
