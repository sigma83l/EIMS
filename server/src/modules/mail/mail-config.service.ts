import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class MailConfigSerivce implements MailerOptionsFactory {
  createMailerOptions(): MailerOptions | Promise<MailerOptions> {
    console.log(__dirname)
    return {
      transport: {
        host: process.env.MAIL_HOST,
        service: 'Gmail',
        secure: true,
        port: +process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
        debug: true,
        logger: true,
      },
      defaults: {
        from: '"EMU INTERNSHIP APPLICATION" <info@mail.ima.emu.edu.tr>',
      },
      template: {
        dir: join(__dirname, '../../../src/modules/mail/', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    } as MailerOptions;
  }
}
