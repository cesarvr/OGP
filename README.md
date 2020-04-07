

```yaml
livenessProbe:
  exec:
    command: ['curl', 'http://localhost:8080']
  failureThreshold: 3
  periodSeconds: 10
readinessProbe:
  exec:
    command: ['curl', 'http://localhost:8080']
  initialDelaySeconds: 5
  periodSeconds: 5 
```

