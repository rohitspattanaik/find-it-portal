import { AppShell } from "@mantine/core"

const Main = ( { children }: { children: React.ReactNode } ) => {
    return (
        <AppShell.Main>
            {children}
        </AppShell.Main>
    )   
}

export default Main;
