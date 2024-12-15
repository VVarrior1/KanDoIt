import db from "@/util/db";


export async function GET(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const email = searchParams.get('email');
  
      if (!email) {
        return new Response(
          JSON.stringify({ error: 'Email is required' }),
          { status: 400 }
        );
      }
  
      // Fetch projects where the user is associated via email
      const projects = await db.project.findMany({
        where: {
          OR: [
            { manager: { email } }, // User is the manager
            { Tasks: { some: { employee: { email } } } }, // User is assigned as an employee in tasks
          ],
        },
        include: {
          manager: true,
          Tasks: true,
        },
      });
  
      return new Response(JSON.stringify(projects), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch projects' }),
        { status: 500 }
      );
    }
  }
  
export async function POST(req: Request) {
    try {
        const data = await req.json();

        if (!data.projectName || !data.manager_id) {
            return new Response(
                JSON.stringify({ error: 'Project name and manager ID are required' }),
                { status: 400 }
            );
        }

        const newProject = await db.project.create({
            data: {
                projectName: data.projectName,
                manager_id: data.manager_id,
                hasFile: data.hasFile || false,
            },
        });

        return new Response(JSON.stringify(newProject), { status: 201 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Failed to create project', details: error }),
            { status: 500 }
        );
    }
}

