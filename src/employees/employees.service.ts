import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Employee, EmployeeDocument } from './schema/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-emloyee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    private jwtService: JwtService,
  ) {}

  async register(createEmployeeDto: CreateEmployeeDto) {
    const { email, password } = createEmployeeDto;

    const existingEmployee = await this.employeeModel.findOne({ email });
    if (existingEmployee) throw new BadRequestException('El email ya está registrado');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployee = new this.employeeModel({ ...createEmployeeDto, password: hashedPassword });
    await newEmployee.save();

    return { message: 'Empleado registrado exitosamente' };
  }

  async login(loginDto: LoginEmployeeDto) {
    const { email, password } = loginDto;

    const employee = await this.employeeModel.findOne({ email });
    if (!employee) throw new UnauthorizedException('Credenciales inválidas');

    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) throw new UnauthorizedException('Credenciales inválidas');

    const payload = { email: employee.email, sub: employee._id, role: employee.role, warehouseId: employee.warehouseId };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().select('-password').exec();
  }

  async findById(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findById(id).select('-password').exec();
    if (!employee) throw new NotFoundException('Empleado no encontrado');
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const updatedEmployee = await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, { new: true });
    if (!updatedEmployee) throw new NotFoundException('Empleado no encontrado');
    return updatedEmployee;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletedEmployee = await this.employeeModel.findByIdAndDelete(id);
    if (!deletedEmployee) throw new NotFoundException('Empleado no encontrado');
    return { message: 'Empleado eliminado' };
  }
}
