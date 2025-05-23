import { GET, POST } from "@/pages/api/likes"
import { describe, expect, it } from "vitest"

const CLIENT_ADDRESS = "::1"
const TARGET_ID = "you-should-overcommunicate-pending-state"

describe("API Endpoint Tests", () => {
  it("should handle GET request", async () => {
    const request = new Request(
      `http://localhost:3000/api/likes?targetId=${TARGET_ID}`,
      {
        method: "GET",
      },
    )

    const response = await GET({ request, clientAddress: CLIENT_ADDRESS })

    expect(response.status).toBe(200)
  })

  it("should handle POST request with JSON body", async () => {
    const request = new Request(
      `http://localhost:3000/api/likes?targetId=${TARGET_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    const response = await POST({ request, clientAddress: CLIENT_ADDRESS })

    expect(response.status).toBe(200)
  })
})
