const MockUser = {
    email: 'admin@admin.com',
    password: 'admin',
}


export async function POST(request: Request) {
    const { data: { email, password } } = await request.json()
    console.log(email, password)
    if (email !== MockUser.email || password !== MockUser.password) {
        return Response.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    return Response.json({ token: 'mocked_token' }, { status: 200 })
}
