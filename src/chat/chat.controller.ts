import { Controller, Post, Body, UseInterceptors, UploadedFile, Param, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './DTO/create-message.dto';
import { UpdateMessageDto } from './DTO/update-message.dto';


@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send')
  async sendMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.chatService.createMessage(createMessageDto);
  }

  @Post('update')
  async updateMessage(@Body() updateMessageDto: UpdateMessageDto) {
    return this.chatService.updateMessage(updateMessageDto.id, updateMessageDto);
  }

  @Post('remove')
  async deleteMessage(@Body() body: { id: string }) {
    return this.chatService.deleteMessage(body.id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { fileUrl: `http://localhost:3000/uploads/${file.filename}` };
  }
  
  // Obtener todos los mensajes de todos los usuarios
  @Get('all')
  async getAllMessages() {
    return this.chatService.getAllMessages();
  }

  // Obtener los mensajes de una conversación privada entre dos usuarios
  @Get('conversation/:user1/:user2')
  async getConversation(@Param('user1') user1: string, @Param('user2') user2: string) {
    return this.chatService.getConversation(user1, user2);
  }
}
