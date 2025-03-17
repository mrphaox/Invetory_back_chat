  import { Injectable, NotFoundException } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { CreateMessageDto } from './DTO/create-message.dto';
  import { Message, MessageDocument } from './schema/message.schema';
  import { UpdateMessageDto } from './DTO/update-message.dto';


  @Injectable()
  export class ChatService {
    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

    async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
      const newMessage = new this.messageModel(createMessageDto);
      return newMessage.save();
    }

    async findAll(): Promise<Message[]> {
      return this.messageModel.find().sort({ createdAt: -1 }).exec();
    }

    async updateMessage(id: string, updateMessageDto: UpdateMessageDto): Promise<Message> {
      const message = await this.messageModel.findById(id);
      if (!message) throw new NotFoundException('Mensaje no encontrado');

      if (updateMessageDto.content) message.content = updateMessageDto.content;
      if (updateMessageDto.fileUrl) message.fileUrl = updateMessageDto.fileUrl;
      message.edited = true;

      return message.save();
    }

    async deleteMessage(id: string): Promise<{ message: string }> {
      const message = await this.messageModel.findById(id);
      if (!message) throw new NotFoundException('Mensaje no encontrado');

      message.deleted = true;
      message.content = 'Mensaje eliminado';
      return message.save().then(() => ({ message: 'Mensaje eliminado correctamente' }));
    }
    // Obtener TODOS los mensajes de TODOS los usuarios
    async getAllMessages(): Promise<Message[]> {
      return this.messageModel.find().sort({ createdAt: -1 }).exec();
    }

    // Obtener mensajes entre DOS usuarios específicos (conversación privada)
    async getConversation(user1: string, user2: string): Promise<Message[]> {
      return this.messageModel.find({
        $or: [
          { sender: user1, receiver: user2 },
          { sender: user2, receiver: user1 },
        ],
      })
      .sort({ createdAt: -1 })
      .exec();
    }
  }
