import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './DTO/create-message.dto';
import { UpdateMessageDto } from './DTO/update-message.dto';


@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('sendMessage')
  async handleSendMessage(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.chatService.createMessage(createMessageDto);

    // Enviar solo al emisor y receptor
    this.server.to(createMessageDto.sender).emit('message', message);
    this.server.to(createMessageDto.receiver).emit('message', message);

    return message;
  }

  @SubscribeMessage('editMessage')
  async handleEditMessage(@MessageBody() updateMessageDto: UpdateMessageDto) {
    const message = await this.chatService.updateMessage(updateMessageDto.id, updateMessageDto);
    this.server.emit('messageUpdated', message);
    return message;
  }

  @SubscribeMessage('deleteMessage')
  async handleDeleteMessage(@MessageBody() id: string) {
    await this.chatService.deleteMessage(id);
    this.server.emit('messageDeleted', id);
  }
}
