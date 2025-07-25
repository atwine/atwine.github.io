# Terminal Command Execution Rule

## 🚨 CRITICAL RULE: Sequential Terminal Command Execution

**Never execute multiple terminal commands simultaneously or before the previous command has completely finished.**

### 📋 Enforcement Protocol

1. **One Command at a Time**
   - Execute only ONE terminal command at a time
   - Wait for complete execution (exit code received) before proceeding

2. **Proper Blocking Configuration**
   ```
   Blocking=true    # For commands that must complete before continuing
   Blocking=false   # Only for long-running servers/background processes
   ```

3. **Wait Duration Management**
   ```
   WaitDurationSeconds=0     # Get immediate status
   WaitDurationSeconds=30    # Wait up to 30s for completion
   WaitDurationSeconds=60    # For longer operations
   ```

4. **Command Status Verification**
   - Use `command_status` tool to check long-running commands
   - Verify exit codes before proceeding
   - Monitor output for errors or completion signals

### ⚠️ Violation Consequences

- **Wastes User Credits:** Incomplete commands require manual repetition
- **Causes Installation Failures:** Overlapping package installations fail
- **Disrupts Development Workflow:** Forces context switching and manual fixes
- **Reduces Efficiency:** Time spent on repeated operations

### ✅ Best Practices

1. **Sequential Execution Pattern:**
   ```
   Command 1 (Blocking=true) → Wait for completion → Command 2 (Blocking=true)
   ```

2. **Long-Running Command Pattern:**
   ```
   Command (Blocking=false, WaitDurationSeconds=10) → Check status → Proceed
   ```

3. **Installation Command Pattern:**
   ```
   npm install (Blocking=true) → bundle install (Blocking=true) → Test commands
   ```

### 🎯 Implementation Examples

**❌ Wrong (Overlapping Commands):**
```
run_command: npm install (Blocking=false)
run_command: bundle install (Blocking=false)  # WRONG - npm may still be running
```

**✅ Correct (Sequential Commands):**
```
run_command: npm install (Blocking=true)      # Wait for completion
run_command: bundle install (Blocking=true)   # Only after npm finishes
```

### 📝 User Rule Addition

Add this to your user rules section:

```markdown
## Terminal Command Execution Rule

All terminal commands must be executed sequentially. Never run multiple commands simultaneously. Always wait for the previous command to complete (receive exit code) before executing the next command. Use Blocking=true for commands that must complete before continuing. This prevents wasted credits and ensures reliable development workflow.
```

---

**This rule is MANDATORY for all terminal operations to maintain efficiency and cost-effectiveness.**
