import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  private employees: CreateEmployeeDto[] = [
  {
    id: 1,
    name: "Alberto",
    lastName: "Costas",
    phoneNumber: "4421001739"
  },
  {
    id: 2,
    name: "Jose",
    lastName: "Perez",
    phoneNumber: "4421449027"
  }
  ]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length + 1
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: number) {
    const employee = this.employees.find((employee) => employee.id == id)
    return employee;  
  }

  // codigo original me marca error:
update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
  let employeeToUpdate = this.findOne(id);
  employeeToUpdate = {
    ...employeeToUpdate,
    ...updateEmployeeDto,
  }
  this.employees = this.employees.map((employee) => {
    if (employee.id == id) {
      employee = employeeToUpdate
    }
    return employee
  })
  return employeeToUpdate;
}

remove(id: number) {
  this.employees = this.employees.filter((employee) => employee.id !== id);
  return this.employees;
}
}
/*codigo corregido es el siguiente:

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    // Validar si el empleado existe antes de intentar actualizarlo
    const existingEmployee = this.findOne(id);

    if (!existingEmployee) {
      throw new Error(`Employee with id ${id} not found`);
    }

    // Aseguramos que el empleado a actualizar no sea undefined y que su id esté correctamente asignado
    const employeeToUpdate: CreateEmployeeDto = {
      ...existingEmployee,  // Spread con los datos del empleado original
      ...updateEmployeeDto, // Spread con los datos que vamos a actualizar
      id: existingEmployee.id,  // Aseguramos que el id no sea undefined
    };

    // Mapeamos los empleados y actualizamos al que coincida con el id
    this.employees = this.employees.map((employee) => {
      if (employee.id === id) {
        return employeeToUpdate;  // Devolvemos el objeto actualizado
      }
      return employee;
    });

    return employeeToUpdate;  // Devolvemos el empleado actualizado
  }

  remove(id: number) {
    this.employees = this.employees.filter((employee) => employee.id !== id);
    return this.employees;
  }
}*/
  