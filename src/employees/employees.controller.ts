import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

import { LoginEmployeeDto } from './dto/login-employee.dto';
import { UpdateEmployeeDto } from './dto/update-emloyee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post('register')
  async register(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.register(createEmployeeDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginEmployeeDto) {
    return this.employeesService.login(loginDto);
  }

  @Get()
  async findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.employeesService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.employeesService.delete(id);
  }
}
