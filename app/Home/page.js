import { Header } from '@/components/header';
import { SidePane } from '@/components/side-pane';

export default function Page() {
    return (
        <div className="flex flex-col h-screen">
            <Header className="w-full" />
            <div className="flex flex-1 overflow-hidden">
                <SidePane className="w-64 h-full overflow-y-auto" />
                <main className="flex-1 overflow-y-auto p-5">
                    <h1>Home</h1>
                </main>
            </div>
        </div>
    );
}