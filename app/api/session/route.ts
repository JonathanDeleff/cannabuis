import { auth } from '@/auth';

export const GET = async (req: Request) => {
    try {
        const session = await auth(); 
        return new Response(JSON.stringify(session), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching session:', error);

        return new Response(
            JSON.stringify({ error: 'Failed to fetch session' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
