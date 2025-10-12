import { AppShell, Flex, Text } from "@mantine/core"
import styles from "./Header.module.css"

const Header = () => {


    return (
        <AppShell.Header className={styles.header}>
            <Flex justify="space-between">
                <Text> Header </Text>
            </Flex>
        </AppShell.Header>
    )
}

export default Header;