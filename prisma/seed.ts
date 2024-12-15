import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create 3 users (one of each role type)
  const manager = await prisma.user.create({
    data: {
      email: 'manager@example.com',
      phoneNum: '123-456-7890',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Manager',
      lastName: 'One',
      roleType: 'MANAGER',
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      phoneNum: '234-567-8901',
      password: await bcrypt.hash('adminpassword', 10),
      firstName: 'Admin',
      lastName: 'User',
      roleType: 'ADMIN',
    },
  });

  const employee = await prisma.user.create({
    data: {
      email: 'employee@example.com',
      phoneNum: '345-678-9012',
      password: await bcrypt.hash('employee123', 10),
      firstName: 'Employee',
      lastName: 'Three',
      roleType: 'EMPLOYEE',
    },
  });

  // Create 2 projects
  const project1 = await prisma.project.create({
    data: {
      projectName: 'Project 1',
      manager_id: manager.id,
      hasFile: true,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      projectName: 'Project 2',
      manager_id: manager.id,
      hasFile: false,
    },
  });

  // Create 5 tasks for project1
  const task1 = await prisma.task.create({
    data: {
      taskName: 'Task 1 for Project 1',
      taskPriority: 'HIGH',
      project_id: project1.id,
      employee_id: employee.id,
    },
  });

  const task2 = await prisma.task.create({
    data: {
      taskName: 'Task 2 for Project 1',
      taskPriority: 'MEDIUM',
      project_id: project1.id,
      employee_id: employee.id,
    },
  });

  const task3 = await prisma.task.create({
    data: {
      taskName: 'Task 3 for Project 1',
      taskPriority: 'LOW',
      project_id: project1.id,
      employee_id: employee.id,
    },
  });

  const task4 = await prisma.task.create({
    data: {
      taskName: 'Task 4 for Project 1',
      taskPriority: 'HIGH',
      project_id: project1.id,
      employee_id: employee.id,
    },
  });

  const task5 = await prisma.task.create({
    data: {
      taskName: 'Task 5 for Project 1',
      taskPriority: 'MEDIUM',
      project_id: project1.id,
      employee_id: employee.id,
    },
  });

  // Create 6 tasks for project2
  const task6 = await prisma.task.create({
    data: {
      taskName: 'Task 1 for Project 2',
      taskPriority: 'LOW',
      project_id: project2.id,
      employee_id: employee.id,
    },
  });

  const task7 = await prisma.task.create({
    data: {
      taskName: 'Task 2 for Project 2',
      taskPriority: 'HIGH',
      project_id: project2.id,
      employee_id: employee.id,
    },
  });

  const task8 = await prisma.task.create({
    data: {
      taskName: 'Task 3 for Project 2',
      taskPriority: 'MEDIUM',
      project_id: project2.id,
      employee_id: employee.id,
    },
  });

  const task9 = await prisma.task.create({
    data: {
      taskName: 'Task 4 for Project 2',
      taskPriority: 'LOW',
      project_id: project2.id,
      employee_id: employee.id,
    },
  });

  const task10 = await prisma.task.create({
    data: {
      taskName: 'Task 5 for Project 2',
      taskPriority: 'HIGH',
      project_id: project2.id,
      employee_id: employee.id,
    },
  });

  const task11 = await prisma.task.create({
    data: {
      taskName: 'Task 6 for Project 2',
      taskPriority: 'MEDIUM',
      project_id: project2.id,
      employee_id: employee.id,
    },
  });

  // Optionally, add comment documents (without actual comment entries)
  await prisma.comment.create({
    data: {
      task_id: task1.id,
      user_id: admin.id,
      message: 'Placeholder comment for Task 1 of Project 1',
    },
  });

  await prisma.comment.create({
    data: {
      task_id: task6.id,
      user_id: manager.id,
      message: 'Placeholder comment for Task 1 of Project 2',
    },
  });

  console.log('Seeding complete!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
