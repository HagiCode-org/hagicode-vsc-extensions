const vscode = require('vscode');

function getDashboardUri(address) {
  if (typeof address !== 'string' || !/^https?:\/\//i.test(address.trim())) {
    return undefined;
  }

  try {
    return vscode.Uri.parse(new URL(address.trim()).href, true);
  } catch {
    return undefined;
  }
}

async function openDashboard() {
  const address = vscode.workspace.getConfiguration('hagicode').get('dashboardUrl');
  const dashboardUri = getDashboardUri(address);

  if (!dashboardUri) {
    vscode.window.showErrorMessage('Set hagicode.dashboardUrl to a valid HTTP or HTTPS URL.');
    return;
  }

  try {
    if (await vscode.env.openExternal(dashboardUri)) {
      return;
    }
  } catch {
    // Report browser launch failures through the same message as a false result.
  }

  vscode.window.showErrorMessage('Could not open the HagiCode dashboard in your browser.');
}

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('hagicode.openDashboard', openDashboard)
  );
}

module.exports = { activate };
