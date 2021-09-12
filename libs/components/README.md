# Rooftop Components

## Card

创建一个卡片组件，支持点击跳转。

### Example

```tsx
import { Card } from '@iinfinity/components/card';

export default () => <Card.Container link={{ url: 'https://blog.don.red', inNewTab: true }}>
  <Card.Title>卡片标题</Card.Title>
  <Card.Description>卡片内容</Card.Description>
  <Card.Body><p>这里是<strong>卡片内容</strong></p></Card.Body>
  <Card.Footer>版权所有 XXX <sup>©</sup> 2021</Card.Footer>
</Card.Container>;
```
