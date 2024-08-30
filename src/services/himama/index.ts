import needle from 'needle'
import UserAgent from 'user-agents'
import { JSDOM } from 'jsdom'

import { Child } from './types.js'

const userAgent = new UserAgent()

const HIMAMA_BASE_URL = new URL('https://www.himama.com/')
const HIMAMA_LOGIN_URL = new URL('/login', HIMAMA_BASE_URL)
const HIMAMA_HEADLINES_URL = new URL('/headlines', HIMAMA_BASE_URL)

const getCSRFTokens = async (): Promise<{
  sessionId: string,
  csrfToken: string,
}> => {
  const response = await needle('get', HIMAMA_LOGIN_URL.toString(), {
    headers: { 'user-agent': userAgent.toString(), },
    parse_cookies: true,
  })

  const { document } = new JSDOM(response.body, {
    url: HIMAMA_LOGIN_URL.toString(),
  }).window

  return {
    sessionId: response.cookies?.['_himama_session'] ?? null,
    csrfToken: (document.querySelector('meta[name=csrf-token]') as HTMLMetaElement)?.content ?? null,
  }
}

export const login = async (
  email: string,
  password: string,
): Promise<string | null> => {
  const { sessionId, csrfToken } = await getCSRFTokens()

  const form = new URLSearchParams([
    ['authenticity_token', csrfToken],
    ['authenticity_token', csrfToken],
    ['user[login]', email],
    ['user[password]', password],
    ['commit','Log+in'],
  ])

  const response = await needle(
    'post',
    HIMAMA_LOGIN_URL.toString(),
    form.toString(),
    {
      headers: {
        'user-agent': userAgent.toString(),
        'content-type': 'application/x-www-form-urlencoded',
      },
      cookies: {
        _himama_session: sessionId,
      },
      parse: true,
      parse_cookies: true,
    },
  )

  return response.cookies?.['_himama_session'] ?? null
}

export const getChildren = async (sessionId: string): Promise<Child[]> => {
  const response = await needle(
    'get',
    HIMAMA_HEADLINES_URL.toString(),
    {
      headers: {
        'user-agent': userAgent.toString(),
        'content-type': 'application/x-www-form-urlencoded',
      },
      cookies: {
        _himama_session: sessionId,
      },
    },
  )

  const { document } = new JSDOM(response.body, {
    url: HIMAMA_HEADLINES_URL.toString(),
  }).window

  return [
    ...document.querySelectorAll<HTMLAnchorElement>('.subnav .nav a')
  ].map<Child | null>((anchor) => {
    const id = anchor.href.split('/').pop()?.trim()
    const name = anchor.textContent?.trim()
    if (id == null || name == null) {
      return null
    }

    return {
      id,
      name,
    }
  })
  .filter((child) => child != null)
}
