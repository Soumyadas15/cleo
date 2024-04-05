import assignAuth0Role from "@/actions/assignAuth0Role";
import createAuth0Account from "@/actions/createAuth0Account";
import createUserAccount from "@/actions/createUserAccount";
import getManagementToken from "@/actions/mgt-token";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import axios from "axios";
import { ManagementClient } from 'auth0';
import { sendPasswordMail } from "@/lib/password-mail";
import { useImage } from "@nextui-org/react";
import { generatePassword } from "@/lib/generatePassword";








export async function POST(request: Request) {
  try {

    const imageUrl = 'http://res.cloudinary.com/demiptppx/image/upload/v1712233615/n0mmtoxrzwzcbf0jej3p.png';
    const password = generatePassword();

    const currentUser = await initialProfile();

    if (!currentUser) {
      return new Response('User not found', { status: 404 });
    }

    if (!(currentUser.role === "ADMIN" || currentUser.role === "MANAGER")) {
        return new Response("You don't have the required permissions", { status: 401 });
    }

    const body = await request.json();
    const { sub, projectId, title, name, contact } = body;
    
    let role;

    if(title === "ADMIN") role = process.env.AUTH0_ADMIN_ROLE_ID;
    else if(title === "MANAGER") role = process.env.AUTH0_MANAGER_ROLE_ID;
    else if(title === "AUDITOR") role = process.env.AUTH0_AUDITOR_ROLE_ID;
    else if(title === "CLIENT") role = process.env.AUTH0_CLIENT_ROLE_ID;
    else{
      return new Response("Invalid role", { status: 400 });
    }

    if (!projectId ||!title ||!contact ||!name) {
      return new Response('Missing required fields', { status: 400 });
    }

    const project = await db.project.findUnique({
        where: {
            id: projectId,
        }
    })

    const token = await getManagementToken();
    let newUser;
    try {
      newUser = await createAuth0Account(
        contact, 
        name, 
        password,
        'http://res.cloudinary.com/demiptppx/image/upload/v1712233615/n0mmtoxrzwzcbf0jej3p.png',
        token
      );

    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
          return new Response(error.message, { status: 500 });
      } else {
          return new Response('An unknown error occurred', { status: 500 });
      }
    }

    let userRole;

    // Generate role for the user
    try {
      userRole = await assignAuth0Role(
        //@ts-ignore
        role, 
        newUser.user_id, 
        token
      );
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
          return new Response(error.message, { status: 500 });
      } else {
          return new Response('An unknown error occurred', { status: 500 });
      }
    }

    const myUser = await db.user.create({
      data:{
        userId: newUser.user_id,
        name: name,
        email: contact,
        imageUrl: imageUrl,
        role: title
      }
    })
    

    if(!myUser){
      return new Response('User not created', { status: 500 });
    }

    const mail = sendPasswordMail(
      contact,
      password,
      title
    )
    
    if (!project) {
        return new Response('Project not found', { status: 400 });
    }

    const stakeholder = await db.stakeholder.create({
        data: {
            title: title,
            name: name,
            contact: contact,
            projectId: projectId,
        }
    })

    const newMember = await db.member.create({
      data: {
        role: title,
        userId: myUser?.id,
        projectId: project.id,
        name: myUser?.name,
        imageUrl: myUser?.imageUrl,
    }
    })

    return new Response(JSON.stringify(stakeholder), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}


















export async function PUT(request: Request) {
  try {

    const currentUser = await initialProfile();

    if (!currentUser) {
      return new Response('User not found', { status: 404 });
    }
    
    const body = await request.json();
    const { stakeholderId, title, name, contact } = body;

    if (!stakeholderId ||!title ||!contact ||!name) {
        return new Response('Missing required fields', { status: 400 });
    }

    if (!(currentUser.role === "ADMIN" || currentUser.role === "MANAGER")) {
        return new Response("You don't have the required permissions", { status: 401 });
    }

    const stakeholder = await db.stakeholder.findUnique({
      where: {
        id: stakeholderId,
      },
    });

    if (!stakeholder) {
      return new Response('Stakeholder not found', { status: 404 });
    }

    const updatedStakeholder = await db.stakeholder.update({
      where: {
        id: stakeholderId,
      },
      data: {
        title: title,
        name: name,
        contact: contact,
      },
    });

    return new Response(JSON.stringify(updatedStakeholder), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}