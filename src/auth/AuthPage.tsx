import api from '@/lib/api'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export const AuthPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const res = await api.login(
            email,
            password,
        );
        
        if(res.token){
            localStorage.setItem("token", res.token);
            window.location.reload();
        }else {
            alert(res.message || "login gagal")
        }
    }

    const handleRegister = async ()=> {
        const res = await api.register(
            email,
            password,
        )

        if(res.message){
            alert(res.message)
        }
    }


  return (
    <div className='flex items-center justify-center h-screen'>
        <Tabs defaultValue="login" className='w-full max-w-md'>
            <TabsList>
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* login */}
            <TabsContent value="login">
                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            Login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="example@email.com" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" value={password} onChange={(e)=> setPassword(e.target.value)} type="password" required />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={handleLogin}>Login</Button>
                    </CardFooter>
                </Card>
            </TabsContent>

            {/* register */}
            <TabsContent value="register">
                <Card>
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>
                            Register for a new account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="example@email.com" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" value={password} onChange={(e)=> setPassword(e.target.value)} type="password" required />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={handleRegister}>Register</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>

    </div>
  )
}
