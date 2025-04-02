# Frontend 개발 환경 및 협업 규칙

## 🛠️ 기술 스택

### Language, Framework, Library

- **Next.js**
    
    서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 지원하여 페이지 로딩 속도와 SEO를 최적화합니다.
    
- **TypeScript**
    
    정적 타입 체킹을 통해 안정성과 유지보수성을 높이고, 대규모 코드베이스 관리에 유리합니다.
    
- **React**
    
    컴포넌트 기반 UI 라이브러리로, 재사용성과 렌더링 효율성이 뛰어납니다.
    
- **Tailwind CSS**
    
    유틸리티 기반의 CSS 프레임워크로 빠른 스타일링이 가능하며, 커스터마이징도 유연합니다.
    
- **CSS / SCSS**
    
    Tailwind로 커버되지 않는 커스텀 스타일을 보완적으로 사용합니다.
    
- **ESLint & Prettier**
    
    코드 스타일 자동화 및 일관성 유지를 위한 도구입니다.
    
- **Husky**
    
    Git hooks로 푸시 전에 코드 검사를 실행하여 품질을 유지합니다.
    

## ⚙️ CI/CD

- **Vercel**
GitHub 연동으로 자동 배포가 가능하며, Next.js에 최적화된 배포 플랫폼입니다.

## 🤝 협업 도구

- **Slack**: 실시간 커뮤니케이션
- **Notion**: 문서화 및 일정/작업 관리
- **Gather**: 가상 오피스 협업 공간

---

# 📂 Git / PR / 파일 네이밍 규칙

## Git Branch Naming Rule

| Prefix | 설명 |
| --- | --- |
| feature | 새로운 기능 개발 |
| bugfix | 버그 수정 |
| docs | 문서 수정 |
| config | 설정 파일 수정 |

### 예시

- `feature/25-ui-component`
- `docs/update-readme`
- `style/update-button`

## File Naming Rule

| 항목 | 규칙 | 예시 |
| --- | --- | --- |
| 컴포넌트 파일 | PascalCase | `Button.tsx`, `UserCard.tsx` |
| 유틸 함수 | camelCase | `formatDate.ts`, `apiCall.ts` |
| 폴더 이름 | kebab-case | `user-profile/`, `auth/` |
| 스타일 파일 | kebab-case | `header-style.scss` |

## Pull Request Rule

- **PR 제목 형식**: `[prefix] 작업 요약`
- **PR 대상 브랜치**: `develop` 또는 `main`

### 예시

- `[feat] 새로운 버튼 컴포넌트 추가`
- `[fix] 드롭다운 버그 수정`
- `[docs] README 업데이트`

---

# 📌 템플릿

## Pull Request Template

```
## 📝 PR 내용 요약

- 무엇을 추가/변경했는지 요약해주세요

## ✅ 작업 상세

- 상세한 변경사항을 bullet로 적어주세요

## #️⃣ 연관 이슈

> ex) #23

## 🖼️ 변경된 화면 (선택)

> UI 변경이 있다면 스크린샷 첨부

## 💬 기타 논의 사항 (선택)

- 이슈/리뷰 요청/고민 중인 내용 등

## 💬 리뷰 요구사항 (선택)

- 리뷰 시 꼭 봐줬으면 하는 부분이 있다면 작성

```

## Bug Report Template

```
---
name: Bug report
about: 버그 발생 시 사용하는 템플릿
title: '[Bug] '
labels: ['bug']
---

## 🐞 버그 설명
- 어떤 문제가 있었는지 간단히 설명

## 📌 재현 방법
1. 어떤 동작을 했고
2. 어떤 문제가 발생했는지 단계별로 작성

## ✅ 기대 동작
- 원래 어떻게 동작했어야 하는지 설명

## 🖼️ 스크린샷 / 로그 (선택)

## 📎 참고 링크 (선택)

```

## Feature Request Template

```
---
name: Feature request
about: 새로운 기능을 제안할 때 사용
title: '[Feat] '
labels: ['enhancement']
---

## ✨ 제안하는 기능
- 어떤 기능인지 간단히 설명

## 📋 작업 항목
- [ ] 기능 1
- [ ] 기능 2

## ✅ 기대 효과
- 어떤 문제를 해결할 수 있는지

## 📎 참고 자료 (선택)

```

---

## 💬 Commit Convention

```bash
[<Prefix>] #<Issue_Number> <Message>

```

| Prefix | 설명 |
| --- | --- |
| feat | 새로운 기능 |
| fix | 버그 수정 |
| docs | 문서 수정 |
| style | 코드 스타일 변경 |
| refactor | 리팩토링 (기능 변화 없음) |
| chore | 기타 설정 변경, 패키지 업데이트 |
| test | 테스트 코드 추가/수정 |
| perf | 성능 개선 |
| rename | 파일 또는 폴더명 변경 |
| enhancement | 기존 기능 개선 |

---

> 이 문서는 팀의 원활한 협업과 효율적인 개발을 위해 작성된 가이드입니다.
