export default function getServerSession() {
    const req = {
        headers: Object.fromEntries(headers()),
        cookies: Object.fromEntries(
            cookies()
                .getAll()
                .map((c) => [c.name, c.value]),
        ),
    }
    return 1
}