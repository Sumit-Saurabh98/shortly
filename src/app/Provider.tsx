"use client"

import {db} from "@/index"
import { Users } from "@/db/schema"
import { useUser } from "@clerk/nextjs"
import { eq } from "drizzle-orm"
import { useCallback, useEffect } from "react"

const Provider = ({children}: {children: React.ReactNode}) => {

  const {user} = useUser()

  console.log(user, "user")


  const isNewUser = useCallback(async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (email) {
      const result = await db.select().from(Users).where(eq(Users.email, email))
       console.log(result, "result")
      if (result.length === 0) {
        await db.insert(Users).values({
          name: user?.fullName || "", 
          email: user?.primaryEmailAddress?.emailAddress || "", 
          password: "defaultPassword",
          imageUrl: user?.imageUrl || "" 
        })
      }
    }else{
      console.log(user)
    }
  }, [user]);

  useEffect(() => {
    isNewUser()
  }, [user, isNewUser])

 
  return (
    <div className="w-full h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-purple-500">
      {children}
    </div>
  )
}

export default Provider
